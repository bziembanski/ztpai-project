package bziembanski.userRating

import bziembanski.ServiceHelper
import bziembanski.user.UserService
import bziembanski.user.Users
import bziembanski.userRatingType.UserRatingTypeService
import bziembanski.userRatingType.UserRatingTypes
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.*

object UserRatings : IntIdTable(name = "user_ratings") {
    val value = float("value")
    val userRatingType = reference("user_rating_type_id", UserRatingTypes)
    val user = reference("user_id", Users)
}

class UserRatingService {
    suspend fun createUserRating(userRating: UserRating): UserRating? {
        lateinit var userRatingId: EntityID<Int>
        ServiceHelper.dbQuery {
            userRatingId = UserRatings.insert {
                it[value] = userRating.value
                it[userRatingType] = userRating.userRatingType.id
                it[user] = userRating.user.id
            } get UserRatings.id
        }
        return getUserRatingById(userRatingId.value)
    }

    suspend fun getUserRatingById(userRatingId: Int): UserRating? =
        ServiceHelper.dbQuery {
            UserRatings
                .innerJoin(UserRatingTypes)
                .innerJoin(Users)
                .select { (UserRatings.id eq userRatingId) }
                .mapNotNull { toUserRating(it) }
                .singleOrNull()
        }

    suspend fun getAllUserRatings(): List<UserRating> =
        ServiceHelper.dbQuery {
            UserRatings
                .slice(
                    UserRatings.value.avg(),
                    UserRatings.user,
                )
                .selectAll()
                .groupBy(UserRatings.user)
                .mapNotNull { toUserRating(it) }
        }

    suspend fun getAllUserRatings(userId: Int): List<UserRating> =
        ServiceHelper.dbQuery {
            UserRatings
                .slice(
                    UserRatings.value.avg(),
                    UserRatings.user,
                    UserRatings.userRatingType
                )
                .select { UserRatings.user eq userId }
                .groupBy(UserRatings.userRatingType)
                .mapNotNull { toUserRating(it) }
        }

    suspend fun updateUserRating(userRating: UserRating): UserRating? {
        ServiceHelper.dbQuery {
            UserRatings.update({ UserRatings.id eq userRating.id }) {
                it[value] = userRating.value
                it[userRatingType] = userRating.userRatingType.id
                it[user] = userRating.user.id
            }
        }
        return getUserRatingById(userRating.id)
    }

    suspend fun deleteUserRatingById(userRatingId: Int): Boolean =
        ServiceHelper.dbQuery {
            UserRatings.deleteWhere { UserRatings.id eq userRatingId } > 0
        }

    private fun toUserRating(row: ResultRow): UserRating =
        UserRating(
            id = row[UserRatings.id].value,
            value = row[UserRatings.value],
            userRatingType = UserRatingTypeService.toUserRatingType(row),
            user = UserService.toUser(row)
        )
}