import Header from "./components/header/Header"
import WordContainer from "./components/word/WordContainer"
import SchemaContainer from "./components/schema/SchemaContainer"
import WordTypeContainer from "./components/word-type/WordTypeContainer"
import {useGetAllWordTypesQuery} from "./api/word-type-api-slice"

const App = () => {

    const {data: wordTypes, isLoading} = useGetAllWordTypesQuery()

    return (
        <>
            <Header/>
            <main className="container">
                <SchemaContainer
                    wordTypes={wordTypes!}
                    isLoading={isLoading}
                />
                <div className="column">
                    <WordContainer
                        wordTypes={wordTypes!}
                        isLoading={isLoading}
                    />
                    <WordTypeContainer
                        wordTypes={wordTypes!}
                        isLoading={isLoading}
                    />
                </div>
            </main>
        </>
    )
}

export default App
