package com.drabazha.sentence.builder.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class WordTypeResponse {

    private Long wordTypeId;

    private String wordTypeName;
}
