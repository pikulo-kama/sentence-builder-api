package com.drabazha.sentence.builder.api.service;

import com.drabazha.sentence.builder.api.dto.response.SentenceCollectionResponse;

public interface SentenceGeneratorService {

    SentenceCollectionResponse generateSentences(Integer sentenceCount);

    SentenceCollectionResponse generateSentences(Integer sentenceCount, Long schemaId);
}
