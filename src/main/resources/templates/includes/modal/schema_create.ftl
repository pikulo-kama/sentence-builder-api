<div class="modal fade" id="create-schema-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Create New Schema</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="d-flex pb-2">
                    <select id="schema-word-speech-select" class="form-select form-select-sm w-25 mr-1"
                            aria-label=".form-select-sm example">
                        <option selected value="noun">Noun</option>
                        <option value="adjective">Adjective</option>
                        <option value="verb">Verb</option>
                        <option value="adverb">Adverb</option>
                    </select>
                    <select id="schema-word-gender-select" class="form-select form-select-sm w-25"
                            aria-label=".form-select-sm example">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="middle">Middle</option>
                        <option value="general">General</option>
                    </select>
                    <a id="add-schema-word" class="btn btn-primary btn-sm btn-floating ml-2" style="background-color: #e3e3e3" role="button">
                        <i class="fas fa-plus"></i>
                    </a>
                </div>
                <div class="scrollable-block h-100" style="max-height: 200px">
                    <table class="table table-hover text-center">
                        <thead>
                        <tr>
                            <th scope="col">&nbsp;</th>
                            <th scope="col">&nbsp;</th>
                            <th scope="col">&nbsp;</th>
                            <th scope="col">&nbsp;</th>
                        </tr>
                        </thead>
                        <tbody id="schema-word-table-body"></tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button id="close-schema-window-btn" type="button" class="btn btn-secondary" data-mdb-dismiss="modal">
                    Close
                </button>
                <button id="create-schema-btn" type="button" class="btn btn-primary">Create Schema</button>
            </div>
        </div>
    </div>
</div>