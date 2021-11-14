package bziembanski.category

import io.ktor.application.*
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*

fun Route.category(categoryService: CategoryService) {
    route("/categories") {
        route("") {
            get {
                call.respond(
                    HttpStatusCode.OK,
                    categoryService.getAllCategories()
                )
            }
            post {
                val category = categoryService.createCategory(call.receive())

                if (category != null) {
                    call.respond(HttpStatusCode.OK, category)
                } else {
                    call.respond(
                        HttpStatusCode.InternalServerError,
                        "Wystąpił problem w trakcie tworzenia kategorii"
                    )
                }
            }
            put {
                val category = categoryService.updateCategory(call.receive())
                if (category != null) {
                    call.respond(HttpStatusCode.OK, category)
                } else {
                    call.respond(
                        HttpStatusCode.BadRequest,
                        "Wystąpił problem w trakcie edycji kategorii"
                    )
                }
            }
        }
        route("/{id}") {
            get {
                try {
                    val category = categoryService.getCategoryById(
                        Integer.parseInt(
                            call.parameters["id"]
                        )
                    )
                    if (category != null) {
                        call.respond(HttpStatusCode.OK, category)
                    } else {
                        call.respond(
                            HttpStatusCode.NotFound,
                            "Nie znaleziono kategorii"
                        )
                    }
                } catch (e: Throwable) {
                    call.respond(HttpStatusCode.BadRequest, "Błędne dane")
                }
            }
            delete {
                val wasRemoved = categoryService.deleteCategoryById(
                    Integer.parseInt(
                        call.parameters["id"]
                    )
                )
                if (wasRemoved) {
                    call.respond(HttpStatusCode.OK)
                } else {
                    call.respond(
                        HttpStatusCode.NotFound, "Nie znaleziono kategorii"
                    )
                }
            }
        }
    }
}