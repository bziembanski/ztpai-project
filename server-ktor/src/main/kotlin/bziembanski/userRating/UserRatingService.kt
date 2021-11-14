package bziembanski.userRating

import bziembanski.ServiceHelper
import bziembanski.user.Users
import bziembanski.userRatingType.UserRatingTypes
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.*

object UserRatings : IntIdTable() {
    val value = float("value")
    val userRatingType = integer("user_rating_type_id")
        .references(UserRatingTypes.id)
    val user = integer("user_id").references(Users.id)
}

class UserRatingService {
    suspend fun createUserRating(userRating: UserRating): UserRating? {
        lateinit var userRatingId: EntityID<Int>
        ServiceHelper.dbQuery {
            userRatingId = UserRatings.insert {
                it[value] = userRating.value
                it[userRatingType] = userRating.userRatingType
                it[user] = userRating.user
            } get UserRatings.id
        }
        return getUserRatingById(userRatingId.value)
    }

    suspend fun getUserRatingById(userRatingId: Int): UserRating? =
        ServiceHelper.dbQuery {
            UserRatings
                .select { (UserRatings.id eq userRatingId) }
                .mapNotNull { toUserRating(it) }
                .singleOrNull()
        }

    suspend fun getAllUserRatings(): List<UserRating> =
        ServiceHelper.dbQuery {
            UserRatings
                .selectAll()
                .mapNotNull { toUserRating(it) }
        }

    suspend fun updateUserRating(userRating: UserRating): UserRating? {
        ServiceHelper.dbQuery {
            UserRatings.update({ UserRatings.id eq userRating.id }) {
                it[value] = userRating.value
                it[userRatingType] = userRating.userRatingType
                it[user] = userRating.user
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
            user = row[UserRatings.user]
        )
}