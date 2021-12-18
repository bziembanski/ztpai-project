package bziembanski.configuration

import bziembanski.core.ServiceHelper.dbQuery
import bziembanski.annoucementType.AnnouncementTypes
import bziembanski.announcement.Announcements
import bziembanski.category.Categories
import bziembanski.notifications.Notifications
import bziembanski.user.Users
import bziembanski.userRating.UserRatings
import bziembanski.userRatingType.UserRatingTypes
import com.zaxxer.hikari.HikariDataSource
import io.ktor.application.*
import kotlinx.coroutines.runBlocking
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils

fun configureDatabase(environment: ApplicationEnvironment) {

    val ds = HikariDataSource().apply {
        maximumPoolSize = 5
        minimumIdle = 5
        jdbcUrl = environment.config
            .property("ktor.db_url")
            .getString()
        driverClassName = "org.postgresql.Driver"
    }
    Database.connect(ds)
    runBlocking {
        dbQuery {
            //            SchemaUtils.drop(
            //                Users,
            //                UserRatingTypes,
            //                UserRatings,
            //                Categories,
            //                AnnouncementTypes,
            //                Announcements,
            //                inBatch = true
            //            )
            SchemaUtils.create(
                Users,
                UserRatingTypes,
                UserRatings,
                Categories,
                AnnouncementTypes,
                Announcements,
                Notifications,
                inBatch = true
            )
        }
    }
}