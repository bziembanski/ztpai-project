package bziembanski.user

import kotlinx.serialization.Serializable
import org.mindrot.jbcrypt.BCrypt


@Serializable
data class User(
    val id: Int = 0,
    val username: String,
    private var _password: String = "",
    val email: String,
    val name: String = "",
    val surname: String = "",
    val avatar: String = "",
) {
    var password: String
        get() = _password
        set(value) {
            BCrypt.hashpw(value, BCrypt.gensalt())
        }

    init {
        _password = BCrypt.hashpw(password, BCrypt.gensalt())
    }
}
