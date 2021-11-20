package bziembanski.user

import bziembanski.announcement.Announcement
import kotlinx.serialization.Required
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import org.mindrot.jbcrypt.BCrypt


@Serializable
data class User(
    val id: Int = -1,
    val username: String = "",
    @SerialName("password")
    private var _password: String = "",
    val email: String = "",
    val name: String = "",
    val surname: String = "",
    var avatar: String = "",
    @Required var announcements: List<Announcement> = emptyList()
) {
    var pass: String
        get() = _password
        set(value) {
            _password = BCrypt.hashpw(value, BCrypt.gensalt())
        }
}
