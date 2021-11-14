package bziembanski.filters

import kotlinx.serialization.Serializable

typealias SelectDataType = List<String>

@Serializable
data class SelectFilter(
    override val typeName: String,
    override val name: String,
    override val data: SelectDataType
) : Filter()