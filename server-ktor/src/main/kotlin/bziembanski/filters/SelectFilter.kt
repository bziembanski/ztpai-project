package bziembanski.filters

import kotlinx.serialization.Serializable

typealias SelectDataType = List<String>

@Serializable
data class SelectFilter(
    override val type: String,
    override val name: String,
    override val data: SelectDataType
): Filter()
