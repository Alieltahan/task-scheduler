import { addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

/**
 *
 * @param {PathRef} tasksRef Path
 * @param {*} taskObj
 * @returns
 */
export const addDocFn = async (tasksRef, taskObj) => {
  try {
    await addDoc(tasksRef, taskObj);
    toast.success(`Task has been added`);
    return { status: 'success' };
  } catch (err) {
    toast.error(err.message);
    return { status: 'error' };
  }
};

/**
 * @param {Path} tasksRef Path To The Doc Ref
 * @returns Object.status & Object.msg
 */
export const DelDocFn = async (tasksRef) => {
  try {
    await deleteDoc(tasksRef);
    toast.success(`Task has been deleted`);
    return { status: 'success' };
  } catch (err) {
    toast.error(err.message);
    return { status: 'error' };
  }
};

/**
 * @param {PathRef} taskRef Path To The Doc Ref
 * @param {Object} updateObj an object to be updated
 * @returns Object.status & Object.msg
 */
export const UpdateDocFn = async (taskRef, updateObj) => {
  try {
    await updateDoc(taskRef, updateObj);
    toast.success(`Doc had been updated`);
    return { status: 'success' };
  } catch (err) {
    toast.error(err.message);
    return { status: 'error' };
  }
};
