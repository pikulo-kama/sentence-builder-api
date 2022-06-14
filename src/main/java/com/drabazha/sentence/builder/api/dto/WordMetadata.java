package com.drabazha.sentence.builder.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
public class WordMetadata {

    public static final String NO_GENDER = "NO GENDER";

    @Getter
    private final String speechPart;

    @Getter
    private final String gender;

    public Boolean hasGender() {
        return !NO_GENDER.equals(gender);
    }
}
