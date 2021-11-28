package bziembanski.filters

import bziembanski.category.CategoryService
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.response.*
import io.ktor.routing.*

fun Route.filters(categoryService: CategoryService) {
    route("/filters") {
        get {
            val categories = categoryService.getAllCategories().map { Pair(it.id, it.name) }
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
                        data = categories
                    )
                )
            )
        }
    }
}