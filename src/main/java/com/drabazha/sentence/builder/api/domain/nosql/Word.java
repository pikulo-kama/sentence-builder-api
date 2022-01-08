package com.drabazha.sentence.builder.api.domain.nosql;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import static com.drabazha.sentence.builder.api.dto.WordMetadata.NO_GENDER;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Document(collection = "words")
public class Word {

    @Id
    private String content;

    private String speechPart;

    private String wordGender;

    public Boolean hasGender() {
        return !NO_GENDER.equals(wordGender);
    }
}
