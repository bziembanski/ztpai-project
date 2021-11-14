package bziembanski.filters

import io.ktor.application.*
import io.ktor.http.*
import io.ktor.response.*
import io.ktor.routing.*
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

fun Route.filters() {
    val data: List<Filter> = listOf(
        SelectFilter(
            name = "Sortowanie",
            data = listOf(
                "Odległość rosnącą",
                "Odległość malejąco",
                "Wynagrodzenie rosnąco",
                "Wynagrodzenie malejąco"
            )
        ),
        SliderFilter(
            name = "Wynagrodzenie za godzinę",
            data = SliderDataType(
                min = 0,
                max = 150,
                step = 5,
                value = Pair(0, 100)
            )
        ),
        CheckboxFilter(
            name = "Kategoria",
            data = listOf(
                "mechanika",
                "ogrodnictwo",
                "elektryka",
                "budownictwo",
            )
        ),
    )
    val dataString = Json.encodeToString(data)
    route("/filters") {
        get {
            call.respondText(
                text = dataString,
                status = HttpStatusCode.OK,
                contentType = ContentType.Application.Json
            )
        }
    }
}