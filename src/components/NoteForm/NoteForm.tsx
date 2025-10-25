import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './NoteForm.module.css';
import { createNote } from '../../services/noteService';
import { useQueryClient } from '@tanstack/react-query';
import type { NoteTag } from '../../types/note';

interface NoteFormProps {
  onClose: () => void;
}

const NoteForm = ({ onClose }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const initialValues = {
    title: '',
    content: '',
    tag: 'Todo',
  };

  const validationSchema = Yup.object({
    title: Yup.string().min(3).max(50).required('Required'),
    content: Yup.string().max(500),
    tag: Yup.string()
      .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
      .required('Required'),
  });

const handleSubmit = async (
  values: typeof initialValues,
  { resetForm }: { resetForm: () => void }
) => {
  await createNote({
    title: values.title,
    content: values.content,
    tag: values.tag as NoteTag, // 👈 тут каст до NoteTag
  });

  queryClient.invalidateQueries({ queryKey: ['notes'] });
  resetForm();
  onClose();
};


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" name="title" type="text" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            id="content"
            name="content"
            as="textarea"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field id="tag" name="tag" as="select" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={onClose}
          >
            Cancel
          </button>
          <button type="submit" className={css.submitButton}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;
