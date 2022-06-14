import {ReactElement} from "react";

export type Translation = {
    icon: ReactElement<any, any>
    header: HeaderTranslation
    login: LoginTranslation
    logout: LogoutTranslation
    general: GeneralTranslation
    word: WordTranslation
    word_type: WordTypeTranslation
    schema: SchemaTranslation
}

type HeaderTranslation = {
    logo: string
}

type LoginTranslation = {
    username_field: string
    password_field: string
    login_button: string
}

type LogoutTranslation = {
    logout_button: string
    logout_text: string
    logout_confirm_no: string
    logout_confirm_yes: string
}

type GeneralTranslation = {
    empty_table_placeholder: string
    close_form_button: string
    word_type_select_label: string
    loading: string
}

type WordTranslation = {
    table_header: string
    col_one_name: string
    col_two_name: string
    open_form_button: string
    form_word_content_field: string
    form_add_new_word_button: string
}

type WordTypeTranslation = {
    table_header: string
    col_one_name: string
    open_form_button: string
    form_word_type_name_field: string
    form_add_new_word_type_button: string
}

type SchemaTranslation = {
    table_header: string
    col_one_name: string
    open_form_button: string
    form_add_word_type_button: string
    form_empty_schema_text: string
    form_save_schema_button: string
}