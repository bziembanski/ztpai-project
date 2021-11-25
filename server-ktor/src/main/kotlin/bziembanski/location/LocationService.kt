package bziembanski.location

import org.w3c.dom.Document
import org.w3c.dom.NodeList
import javax.xml.parsers.DocumentBuilderFactory
import javax.xml.xpath.XPath
import javax.xml.xpath.XPathConstants
import javax.xml.xpath.XPathFactory


class LocationService {
    private val documentBuilder = DocumentBuilderFactory
        .newInstance()
        .newDocumentBuilder()
    private val terc = documentBuilder.parse(
        {}.javaClass.getResourceAsStream(TERC_FILE_NAME)
    )
    private val simc = documentBuilder.parse(
        {}.javaClass.getResourceAsStream(SIMC_FILE_NAME)
    )

    private val xPath = XPathFactory
        .newInstance()
        .newXPath()

    fun voivodeshipList(): List<Pair<String, String>> {
        val ids = compileAndEvaluateXPath(
            """//row[NAZWA_DOD="województwo"]/WOJ/text()""",
            terc
        ).toList()

        return compileAndEvaluateXPath(
            """//row[NAZWA_DOD="województwo"]/NAZWA/text()""",
            terc
        ).toListOfPairs(ids)
    }

    fun countyList(voivodeshipId: String): List<Pair<String, String>> {
        val ids = compileAndEvaluateXPath(
                """//row[WOJ="$voivodeshipId" and 
                    |(NAZWA_DOD="powiat" or NAZWA_DOD="miasto na prawach powiatu")
                    |]/POW/text()""".trimMargin(),
                terc
            ).toList()

        return compileAndEvaluateXPath(
                """//row[WOJ="$voivodeshipId" and 
                    |(NAZWA_DOD="powiat" or NAZWA_DOD="miasto na prawach powiatu")
                    |]/NAZWA/text()""".trimMargin(),
                terc
            ).toListOfPairs(ids)
    }

    fun communeList(
        voivodeshipId: String,
        countyId: String
    ): List<Pair<String, String>> {
        val ids = compileAndEvaluateXPath(
                """//row[WOJ="$voivodeshipId" and POW="$countyId" and 
                    |(NAZWA_DOD="gmina wiejska" or NAZWA_DOD="gmina miejska" or NAZWA_DOD="gmina miejsko-wiejska")
                    |]/GMI/text()""".trimMargin(),
                terc
            ).toList()

        return compileAndEvaluateXPath(
                """//row[WOJ="$voivodeshipId" and POW="$countyId" and 
                    |(NAZWA_DOD="gmina wiejska" or NAZWA_DOD="gmina miejska" or NAZWA_DOD="gmina miejsko-wiejska")
                    |]/NAZWA/text()""".trimMargin(),
                terc
            ).toListOfPairs(ids)
    }

    fun localityList(
        voivodeshipId: String,
        countyId: String,
        communeId: String
    ): List<Pair<String, String>> {
        val ids = compileAndEvaluateXPath(
            """//row[RM!=00 and RM!=04 and RM!=07 and WOJ="$voivodeshipId" and POW="$countyId" and GMI="$communeId"]/SYM/text()""",
            simc
        ).toList()

        return compileAndEvaluateXPath(
            """//row[RM!=00 and RM!=04 and RM!=07 and WOJ="$voivodeshipId" and POW="$countyId" and GMI="$communeId"]/NAZWA/text()""",
            simc
        ).toListOfPairs(ids)
    }

    private fun NodeList.toList(): List<String>{
        val list: MutableList<String> = mutableListOf()
        for(i in 0 until this.length){
            list.add(this.item(i).nodeValue)
        }
        return list
    }

    private fun NodeList.toListOfPairs(otherList: List<String>): List<Pair<String,String>>{
        val list: MutableList<Pair<String,String>> = mutableListOf()
        for(i in 0 until this.length){
            list.add(Pair(otherList[i],this.item(i).nodeValue))
        }
        return list
    }

    private fun compileAndEvaluateXPath(expression: String, xml: Document) =
        xPath
            .compile(expression)
            .evaluate(xml, XPathConstants.NODESET) as NodeList

    companion object {
        const val TERC_FILE_NAME = "/terc.xml"
        const val SIMC_FILE_NAME = "/simc.xml"
    }
}