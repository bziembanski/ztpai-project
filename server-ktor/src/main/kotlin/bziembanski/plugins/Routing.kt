package bziembanski.plugins


import bziembanski.annoucementType.AnnouncementTypeService
import bziembanski.annoucementType.announcementType
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
import kotlinx.serialization.Serializable

fun Application.configureRouting() {
    routing {
        user(UserService())
        userRating(UserRatingService())
        userRatingType(UserRatingTypeService())
        category(CategoryService())
        announcementType(AnnouncementTypeService())
    }
}

@Serializable
data class ErrorResponse(
    val message: String
)
