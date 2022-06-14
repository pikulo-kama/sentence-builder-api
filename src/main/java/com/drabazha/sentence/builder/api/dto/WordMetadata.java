package com.drabazha.sentence.builder.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
public class WordMetadata {

    @Getter
    private Long wordTypeId;
}
