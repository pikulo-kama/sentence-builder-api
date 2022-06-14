import {US} from "country-flag-icons/react/1x1";
import {Translation} from "../types";

const en: Translation = {
    icon: <US className='lang-icon' />,
    header: {
        logo: 'Speak Out'
    },
    login: {
        username_field: 'Username',
        password_field: 'Password',
        login_button: 'Login'
    },
    logout: {
        logout_button: 'Log Out',
        logout_text: 'Do you really want to log out?',
        logout_confirm_no: 'No',
        logout_confirm_yes: 'Yes'
    },
    general: {
        empty_table_placeholder: 'No Rows',
        close_form_button: 'Back',
        word_type_select_label: 'Word Type',
        loading: 'Loading...'
    },
    word: {
        table_header: 'Words',
        col_one_name: 'Word',
        col_two_name: 'Answers on..',
        open_form_button: 'Create New Word',
        form_word_content_field: 'Word Content',
        form_add_new_word_button: 'Add New Word'
    },
    word_type: {
        table_header: 'Word Types',
        col_one_name: 'Answers on..',
        open_form_button: 'Add New Word Type',
        form_word_type_name_field: 'Word Type',
        form_add_new_word_type_button: 'Add New Word Type'
    },
    schema: {
        table_header: 'Schemas',
        col_one_name: 'Schema Structure',
        open_form_button: 'Create Schema',
        form_add_word_type_button: 'Add Word Type to Schema',
        form_empty_schema_text: 'Your schema string would be here',
        form_save_schema_button: 'Save Schema'
    }
}

export default en