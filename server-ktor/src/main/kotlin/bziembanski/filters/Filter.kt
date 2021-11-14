package bziembanski.filters

import kotlinx.serialization.Contextual
import kotlinx.serialization.Serializable


abstract class Filter {
    abstract val type: String
    abstract val name: String
    abstract val data: Any
}
