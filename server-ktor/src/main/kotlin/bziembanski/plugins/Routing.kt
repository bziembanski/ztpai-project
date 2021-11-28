package bziembanski.plugins


import bziembanski.annoucementType.AnnouncementTypeService
import bziembanski.annoucementType.announcementType
import bziembanski.announcement.AnnouncementService
import bziembanski.announcement.announcement
import bziembanski.category.CategoryService
import bziembanski.category.category
import bziembanski.filters.filters
import bziembanski.location.LocationService
import bziembanski.location.location
import bziembanski.security.SecurityService
import bziembanski.security.security
import bziembanski.user.User
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
    val userService = UserService()
    val securityService = SecurityService(environment)
    val userRatingService = UserRatingService()
    val userRatingTypeService = UserRatingTypeService()
    val announcementService = AnnouncementService()
    val announcementTypeService = AnnouncementTypeService()
    val categoryService = CategoryService()
    val locationService = LocationService()

    routing {
        route("/api") {
            security(userService, securityService)
            user(userService, announcementService)
            userRating(userRatingService)
            userRatingType(userRatingTypeService)
            category(categoryService)
            announcementType(announcementTypeService)
            announcement(announcementService)
            location(locationService)
            filters(categoryService)
        }

    }
}

@Serializable
data class InfoResponse(
    val message: List<String>
)
