package com.drabazha.sentence.builder.api.utils;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

public class ListUtil {

    public static <T> List<T> removeDuplicates(List<T> inputList) {
        Set<T> set = new LinkedHashSet<>(inputList);

        inputList.clear();
        inputList.addAll(set);
        return inputList;
    }
}
