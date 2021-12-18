package bziembanski.userRating

import bziembanski.core.ServiceHelper
import bziembanski.user.Users
import bziembanski.userRatingType.UserRatingTypeService
import bziembanski.userRatingType.UserRatingTypes
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.*

object UserRatings: IntIdTable(name = "user_ratings") {
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
                .selectAll()
                .mapNotNull { toUserRating(it) }
        }

    suspend fun getAllUserRatings(userId: Int): List<UserRating> =
        ServiceHelper.dbQuery {
            UserRatings
                .innerJoin(UserRatingTypes)
                .innerJoin(Users)
                .slice(
                    UserRatings.value.avg(),
                    UserRatings.userRatingType,
                    UserRatingTypes.name
                )
                .select { UserRatings.user eq userId }
                .groupBy(UserRatings.userRatingType, UserRatingTypes.name)
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

    private fun toUserRating(row: ResultRow): UserRating{
        val x = UserRatings.value.avg()
        return UserRating(
            id = row.getOrNull(UserRatings.id)?.value?:0,
            value = row[x]!!.toFloat(),
            userRatingType = UserRatingTypeService.toUserRatingType(row),
            //user = UserService.toUser(row)
        )
    }

}