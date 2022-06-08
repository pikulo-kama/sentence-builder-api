package com.drabazha.sentence.builder.api.repository;

import com.drabazha.sentence.builder.api.domain.nosql.Word;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WordRepository extends MongoRepository<Word, String> {

    void deleteByContent(String content);

    void deleteByWordTypeId(Long wordTypeId);
}
