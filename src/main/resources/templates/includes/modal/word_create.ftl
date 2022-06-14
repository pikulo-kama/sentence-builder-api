<div class="modal fade" id="create-word-modal" tabindex="-1" aria-labelledby="create-word-modal-title"
     aria-hidden="true"
     role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="create-word-modal-title">Add Words</h5>
                <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="d-flex justify-content-between pb-2">
                    <div class="d-flex">
                        <div class="form-outline w-50">
                            <input class="form-control" id="word-pattern-input-field" type="text"
                                   aria-label="readonly input example"/>
                            <label class="form-label" for="word-pattern-input-field">Word</label>
                        </div>
                        <a id="add-new-word-btn" class="btn btn-primary btn-sm btn-floating ml-2 align-self-center"
                           style="background-color: #e3e3e3" role="button">
                            <i class="fas fa-plus"></i>
                        </a>
                    </div>
                    <select id="word-create-speech-part-select" class="form-select form-select-sm w-25 mr-1"
                            aria-label=".form-select-sm example">
                        <option class="word-create-speech-part-option" value="noun" selected>Noun</option>
                        <option class="word-create-speech-part-option" value="adjective">Adjective</option>
                        <option class="word-create-speech-part-option" value="verb">Verb</option>
                        <option class="word-create-speech-part-option" value="adverb">Adverb</option>
                    </select>
                </div>
                <div class="d-flex justify-content-between">
                    <div>
                        <input type="hidden" id="new-word-gender" value="general">
                        <input type="checkbox" class="btn-check gender-checkbox" id="male-checkbox" autocomplete="off"/>
                        <label class="btn btn-light px-1 pt-1 pb-1 mb-0" for="male-checkbox">
                            <i class="fas fa-mars" aria-hidden="true"></i>
                        </label>
                        <input type="checkbox" class="btn-check gender-checkbox" id="female-checkbox"
                               autocomplete="off"/>
                        <label class="btn btn-light px-1 pt-1 pb-1 mb-0" for="female-checkbox">
                            <i class="fas fa-venus"></i>
                        </label>
                        <input type="checkbox" class="btn-check gender-checkbox" id="middle-checkbox"
                               autocomplete="off"/>
                        <label class="btn btn-light px-1 pt-1 pb-1 mb-0" for="middle-checkbox">
                            <i class="fas fa-balance-scale-right"></i>
                        </label>
                        <input type="checkbox" class="btn-check gender-checkbox" id="general-checkbox" checked
                               autocomplete="off"/>
                        <label class="btn btn-light px-1 pt-1 pb-1 mb-0" for="general-checkbox">
                            <i class="far fa-dot-circle"></i>
                        </label>
                    </div>
                    <p class="note note-success">
                        <i class="fas fa-arrow-circle-down"></i> Words to be created
                    </p>
                </div>
                <div class="scrollable-block" style="height: 200px">
                    <ul id="proposed-words-list" class="list-group list-group-flush"></ul>
                </div>
            </div>
            <div class="modal-footer">
                <button id="close-add-words-window-btn" type="button" class="btn btn-secondary" data-mdb-dismiss="modal">
                    Close
                </button>
                <button id="save-words-btn" type="button" class="btn btn-primary">Save Words</button>
            </div>
        </div>
    </div>
</div>