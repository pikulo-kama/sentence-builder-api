<div id="word-screen" class="w-75 m-auto pt-3" style="display: none">
    <div class="d-flex flex-row justify-content-between mr-3 mb-1">
        <div class="d-flex w-50">
            <button type="button" class="btn btn-secondary mr-1" style="width: 15%" data-mdb-toggle="modal" data-mdb-target="#create-word-modal">
                Add
            </button>
            <div class="input-group rounded" style="width: 40%">
                <input id="word-search-input" type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon"/>
                <span class="input-group-text border-0" id="search-addon"><i class="fas fa-search"></i></span>
            </div>
        </div>
        <div class="d-flex w-50">
            <select id="word-gender-select" class="form-select form-select-sm mr-1"
                    aria-label=".form-select-sm example">
                <option selected value="">Any</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="middle">Middle</option>
                <option value="general">General</option>
            </select>
            <select id="word-speech-select" class="form-select form-select-sm"
                    aria-label=".form-select-sm example">
                <option selected value="noun">Nouns</option>
                <option value="adjective">Adjectives</option>
                <option value="verb">Verbs</option>
                <option value="adverb">Adverbs</option>
            </select>
        </div>
    </div>
    <div class="scrollable-block">
        <table class="table table-dark table-hover text-center">
            <thead>
            <tr>
                <th scope="col">Content</th>
                <th scope="col">Gender</th>
                <th scope="col">&nbsp;</th>
                <th scope="col">&nbsp;</th>
            </tr>
            </thead>
            <tbody id="word-table-body"></tbody>
        </table>
    </div>
</div>