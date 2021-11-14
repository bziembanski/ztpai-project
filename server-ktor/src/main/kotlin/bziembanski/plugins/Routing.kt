package bziembanski.plugins


import bziembanski.category.CategoryService
import bziembanski.category.category
import bziembanski.user.UserService
import bziembanski.user.user
import bziembanski.userRating.UserRatingService
import bziembanski.userRating.userRating
import bziembanski.userRatingType.UserRatingTypeService
import bziembanski.userRatingType.userRatingType
import io.ktor.application.*
import io.ktor.routing.*

fun Application.configureRouting() {

    routing {
        user(UserService())
        userRating(UserRatingService())
        userRatingType(UserRatingTypeService())
        category(CategoryService())
    }
}
