import {UA} from "country-flag-icons/react/1x1";
import {Translation} from "../types";

const uk: Translation = {
    icon: <UA className='lang-icon' />,
    header: {
        logo: 'Ширше Рота'
    },
    login: {
        username_field: 'Логін',
        password_field: 'Пароль',
        login_button: 'Ввійти'
    },
    logout: {
        logout_button: 'Вийти',
        logout_text: 'Ви справді хочете вийти?',
        logout_confirm_no: 'Ні',
        logout_confirm_yes: 'Так'
    },
    general: {
        empty_table_placeholder: 'Немає даних',
        close_form_button: 'Назад',
        word_type_select_label: 'Тип Слова',
        loading: 'Завантаження...'
    },
    word: {
        table_header: 'Слова',
        col_one_name: 'Слово',
        col_two_name: 'Відповідає на..',
        open_form_button: 'Створити нове слово',
        form_word_content_field: 'Контент',
        form_add_new_word_button: 'Додати'
    },
    word_type: {
        table_header: 'Типи Слів',
        col_one_name: 'Відповідає на..',
        open_form_button: 'Додати новий тип',
        form_word_type_name_field: 'Назва типу',
        form_add_new_word_type_button: 'Створити новий тип'
    },
    schema: {
        table_header: 'Схеми',
        col_one_name: 'Схема побудови',
        open_form_button: 'Створити нову схему',
        form_add_word_type_button: 'Додати до схеми',
        form_empty_schema_text: 'Структура створюваної схеми буде тут',
        form_save_schema_button: 'Зберегти схему'
    }
}

export default uk