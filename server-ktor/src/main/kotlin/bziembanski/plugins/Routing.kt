package bziembanski.plugins


import bziembanski.annoucementType.AnnouncementTypeService
import bziembanski.annoucementType.announcementType
import bziembanski.category.CategoryService
import bziembanski.category.category
import bziembanski.filters.filters
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
        filters()
    }
}

@Serializable
data class ErrorResponse(
    val message: String
)

@Serializable
data class ErrorResponses(
    val message: List<String>
)
