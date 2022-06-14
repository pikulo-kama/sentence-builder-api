package com.drabazha.sentence.builder.api.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class WordResponse {

    private String content;

    private Long wordTypeId;

    private String wordTypeName;
}
