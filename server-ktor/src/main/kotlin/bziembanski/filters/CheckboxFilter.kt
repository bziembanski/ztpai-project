package bziembanski.filters

import kotlinx.serialization.Serializable

typealias CheckboxDataType = List<String>

@Serializable
data class CheckboxFilter(
    override val type: String,
    override val name: String,
    override val data: CheckboxDataType
): Filter()
