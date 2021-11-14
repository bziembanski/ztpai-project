package bziembanski.filters

import kotlinx.serialization.Serializable

@Serializable
sealed class Filter {
    abstract val name: String
    abstract val data: Any
}