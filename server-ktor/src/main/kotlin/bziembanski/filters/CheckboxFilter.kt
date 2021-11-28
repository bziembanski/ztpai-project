package bziembanski.filters

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

typealias CheckboxDataType = List<Pair<Int, String>>

@Serializable
@SerialName("checkbox")
data class CheckboxFilter(
    override val name: String,
    override val data: CheckboxDataType
) : Filter()