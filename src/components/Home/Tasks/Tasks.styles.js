import styled from 'styled-components';

export const TasksContainer = styled.div`
  margin-bottom: 15rem;
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 80%;
    margin: auto;
    font-size: 1.5rem;
    max-width: 104rem;
    /* Hide big table @ 900px */
    @media screen and (max-width: 900px) {
      display: none;
    }
  }

  td,
  th {
    text-align: center;
    border: 1px solid #dddddd;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
  }

  .row {
    display: table-row;
  }

  .toggle-button-cover {
    display: table-cell;
    position: relative;
    width: 200px;
    height: 140px;
    box-sizing: border-box;
  }

  .button-cover {
    height: 100px;
    margin: 20px;
    background-color: #fff;
    box-shadow: 0 10px 20px -8px #c5d6d6;
    border-radius: 4px;
  }

  .button-cover:before {
    counter-increment: button-counter;
    content: counter(button-counter);
    position: absolute;
    right: 0;
    bottom: 0;
    color: #d7e3e3;
    font-size: 12px;
    line-height: 1;
    padding: 5px;
  }

  .button-cover,
  .knobs,
  .layer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .button {
    position: relative;
    top: 50%;

    width: 74px;
    height: 36px;
    margin: auto;
    margin-top: 1rem;
    overflow: hidden;
    @media screen and (max-width: 900px) {
      top: 0%;
      margin: 0;
      height: 32px;
      width: 54px;
    }
  }

  .button.r,
  .button.r .layer {
    border-radius: 100px;
  }

  .button.b2 {
    border-radius: 2px;
  }

  .checkbox {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 3;
  }

  .knobs {
    z-index: 2;
  }

  .layer {
    width: 100%;
    background-color: #ebf7fc;
    transition: 0.3s ease all;
    z-index: 1;
  }
  /* Button 2 */
  #button-2 .knobs:before,
  #button-2 .knobs:after {
    content: 'YES';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 20px;
    height: 10px;
    color: #fff;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
    line-height: 1;
    padding: 9px 4px;
    background-color: #03a9f4;
    border-radius: 50%;
    transition: 0.3s ease all;
    @media screen and (max-width: 900px) {
      top: 3px;
      left: 3px;
      height: 9px;
    }
  }

  #button-2 .knobs:before {
    content: 'YES';
  }

  #button-2 .knobs:after {
    content: 'NO';
  }

  #button-2 .knobs:after {
    right: -28px;
    left: auto;
    background-color: #f44336;
  }

  #button-2 .checkbox:checked + .knobs:before {
    left: -28px;
  }

  #button-2 .checkbox:checked + .knobs:after {
    right: 4px;
  }

  #button-2 .checkbox:checked ~ .layer {
    background-color: #fcebeb;
  }
  .delete_icon {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
  }
  .edit_icon {
    width: 2rem;
    height: 2rem;
  }
  /* Styling for Small Screens */
  @media screen and (max-width: 900px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
    gap: 2rem;
    margin: 1rem;
  }
  .container__small {
    background-color: #ccc;
    padding: 1rem;
    border-radius: 3rem;
    font-size: 1rem;
    display: none;
    /* Show Task Cards on 900px */
    @media screen and (max-width: 900px) {
      display: block;
    }
  }
  .card {
    &__label {
      font-size: 1.3rem;
      margin-right: 1rem;
      font-weight: 700;
    }
    &__status {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 1rem 0;
    }
    &__value {
      font-size: 1.5rem;
    }
    &__edit-del {
      display: flex;
      justify-content: space-between;
      margin: 1rem;
    }
    &__icon-label {
      display: flex;
      align-items: center;
    }
  }
`;
