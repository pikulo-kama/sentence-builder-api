package com.drabazha.sentence.builder.api.cache;

import java.util.Optional;
import java.util.function.Function;

public interface Cache<O, PK> {

    void reloadCache();

    Optional<O> getCachedObject(PK id);

    O getCachedObject(PK id, Function<PK, O> callback);
}
