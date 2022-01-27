import styled from '@emotion/styled'

export default styled.div`
    user-select: none;
    background: rgba(10,9,18, 0.8);
    color: white;
    width: 400px;
    border-radius: 20px;
    margin: 30px;
    padding: 20px;

    .title {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        .titleMenu {
            margin: 0px;
            font-size: 25px;
        }
        .buttonMenu {
            background: #e23e33;
            height: 15px;
            width: 20px;
            text-align: center;
            font-weight: bold;
            border: none;
            font-size: 12px;
            border-radius: 3px;
            cursor: pointer;
        }
    }

    .options {
        ::-webkit-scrollbar {
            display: none;
        }
        border-radius: 10px;
        overflow-y: scroll;
        border: 1px solid #22252e;
        margin-top: 20px;
        max-height: 500px;
    }
`
