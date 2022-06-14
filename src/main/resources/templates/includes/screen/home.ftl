<div id="home-screen" class="w-75 m-auto pt-3" style="display: none">
    <div class="d-flex flex-column justify-content-center align-items-center mt-5">
        <div class="d-flex align-items-center justify-content-center mt-2 w-100" style="height: 20vh">
            <input id="sentence-field" type="text" class="form-control h-50 text-center" style="background-color: white; border-radius: 12px" readonly />
            <a id="generate-random-sentence" role="button"><i class="fas fa-undo-alt ml-2"></i></a>
        </div>
        <div class="d-flex">
            <p class="note note-warning">
                How it Works?<br>
                Our endpoint generates random sentence with random schema
            </p>
            <a class="d-flex btn btn-light align-items-center ml-1" style="background-color: #92b39e; margin-bottom: 1rem" role="button"
               href="/api/v2/sentences/generate">
                Endpoint
            </a>
        </div>
    </div>
</div>