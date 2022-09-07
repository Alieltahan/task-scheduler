import { deleteDoc } from 'firebase/firestore';

/**
 *
 * @param {Path} tasksRef
 */
export const DelDoc = async (tasksRef) => {
  try {
    await deleteDoc(tasksRef);
    return { status: 'success', msg: `Task has been deleted` };
  } catch (err) {
    return { status: 'fail', msg: err.message };
  }
};
