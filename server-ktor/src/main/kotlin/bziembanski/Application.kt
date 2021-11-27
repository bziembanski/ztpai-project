package bziembanski

import bziembanski.ServiceHelper.dbQuery
import bziembanski.annoucementType.AnnouncementTypes
import bziembanski.announcement.Announcement
import bziembanski.announcement.Announcements
import bziembanski.category.Categories
import bziembanski.plugins.configureHTTP
import bziembanski.plugins.configureRouting
import bziembanski.plugins.configureSecurity
import bziembanski.plugins.configureSerialization
import bziembanski.user.Users
import bziembanski.userRating.UserRatings
import bziembanski.userRatingType.UserRatingTypes
import com.zaxxer.hikari.HikariDataSource
import io.ktor.application.*
import kotlinx.coroutines.runBlocking
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils

fun main(args: Array<String>): Unit =
    io.ktor.server.netty.EngineMain.main(args)

@Suppress("unused") // application.conf references the main function. This annotation prevents the IDE from marking it as unused.
fun Application.module() {
    initDB(environment)
    configureSecurity()
    configureRouting()
    configureHTTP()
    configureSerialization()
}

fun initDB(environment: ApplicationEnvironment) {

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
                inBatch = true
            )
        }
    }

}