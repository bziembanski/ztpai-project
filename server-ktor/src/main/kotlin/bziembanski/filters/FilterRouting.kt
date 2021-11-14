package bziembanski.filters

import io.ktor.application.*
import io.ktor.http.*
import io.ktor.response.*
import io.ktor.routing.*

fun Route.filters() {
    route("/filters") {
        get {
            call.respond(
                HttpStatusCode.OK,
                listOf(
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
                    )
                )
            )
        }
    }
}