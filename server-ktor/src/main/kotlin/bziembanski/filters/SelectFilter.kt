package bziembanski.filters

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

typealias SelectDataType = List<String>

@Serializable
@SerialName("select")
data class SelectFilter(
    override val name: String,
    override val data: SelectDataType
) : Filter()