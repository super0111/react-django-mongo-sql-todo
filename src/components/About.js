// eslint-disable-next-line no-unused-expressions

import React, {useState, useContext } from "react";
import { StoreContext } from "../store";

const About = () => {
    const global = useContext(StoreContext);
  
    const [clipId, setClipId] = useState(0);
    const onClickBoard = (ids) => {
        if(ids === clipId) {
            setClipId(0);
        } else {
            setClipId(ids);
        }
    }
    return (
        <>
            <section className = "section section--first">
                <div className = "container">
                    <div className="row mb-5">
                        <div className="col-12">
                            <div className="section__title section__title--page text-center">
                                { global.lan ===false ? <p>Gemstone uses a unique algorithm to generate profits in BUSD and other tokens. In addition, we are creating our own ecosystem, which will include the functions of AMM, P2E, mini-games and much more.</p>
                                : <p>Gemstone использует уникальный алгоритм для получения прибыли в BUSD и других токенах. Кроме того, мы создаем собственную экосистему, в которую войдут функции АММ, P2E, мини-игры и многое другое.</p> }
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="accordion" id="accordion">
                                <div className="row">
                                    <div className="col-12 col-lg-12 accordian-panel mb-5">
                                        <div className="accordion__card">
                                            { global.lan===false ?<button className="" type="button" data-toggle="collapse" data-target="#collapse1" aria-expanded="false" aria-controls="collapse1">
                                                1. WHAT HAPPENS WHEN I HIRE BUSD?
                                                <span onClick={() => onClickBoard(1)}>
                                                {clipId !== 1 ? (<i className="fa fa-plus"></i>) : (<i className="fa fa-minus"></i>)}                                                    
                                                </span>
                                            </button>
                                            :<button className="" type="button" data-toggle="collapse" data-target="#collapse1" aria-expanded="false" aria-controls="collapse1">
                                                1.  Что происходит, когда я инвестирую BUSD?
                                                <span onClick={() => onClickBoard(1)}>
                                                {clipId !== 1 ? (<i className="fa fa-plus"></i>) : (<i className="fa fa-minus"></i>)}                                                    
                                                </span>
                                            </button> }

                                            {global.lan===false && clipId === 1 && (
                                                <div id="collapse1"  data-parent="#accordion">
                                                    <p> When you hire BUSD, your BUSD is locked in the smart contract and rewards you with a daily income of 2.5% on the average. </p>
                                                </div>
                                            )}
                                            
                                            {global.lan===true && clipId === 1 && (
                                                <div id="collapse1"  data-parent="#accordion">
                                                    <p> Когда вы инвестируете BUSD, ваши BUSD фиксируются в смарт-контракте и вы получаете вознаграждение в размере 2.5% ежедневно.</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="accordion__card">
                                            { global.lan === false ? <button className="collapsed" type="button" data-toggle="collapse" data-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                                                2. CAN I TAKE MY INITIAL BUSD BACK?
                                                <span onClick={() => onClickBoard(2)}>
                                                {clipId !== 2 ? (<i className="fa fa-plus"></i>) : (<i className="fa fa-minus"></i>)} 
                                                </span>
                                            </button>
                                            : <button className="collapsed" type="button" data-toggle="collapse" data-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                                                2. Могу ли я забрать свой депозит назад?
                                                <span onClick={() => onClickBoard(2)}>
                                                {clipId !== 2 ? (<i className="fa fa-plus"></i>) : (<i className="fa fa-minus"></i>)} 
                                                </span>
                                            </button> }
                                            {global.lan===false && clipId === 2 && (
                                                <div id="collapse2"  data-parent="#accordion">
                                                    <p>Yes, you can claim your BUSD back after 28 days.</p>
                                                </div>
                                            )}
                                            {global.lan===true && clipId === 2 && (
                                                <div id="collapse2"  data-parent="#accordion">
                                                    <p>Да, вы сможете забрать свой депозит через 28 дней</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="accordion__card">
                                            { global.lan === false ? <button className="collapsed" type="button" data-toggle="collapse" data-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
                                                3.  ARE THERE ANY FEES?
                                                <span onClick={() => onClickBoard(3)}>
                                                {clipId !== 3 ? (<i className="fa fa-plus"></i>) : (<i className="fa fa-minus"></i>)}
                                                </span>
                                            </button>
                                            : <button className="collapsed" type="button" data-toggle="collapse" data-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
                                                3.  Есть ли комиссии?
                                                <span onClick={() => onClickBoard(3)}>
                                                {clipId !== 3 ? (<i className="fa fa-plus"></i>) : (<i className="fa fa-minus"></i>)}
                                                </span>
                                            </button> }
                                            { global.lan === false && clipId === 3 && (
                                            <div id="collapse3"  data-parent="#accordion">
                                                <p> Yes, you must to pay 3% fee on deposit and withdraw.</p>
                                            </div>
                                            )}
                                            { global.lan === true && clipId === 3 && (
                                            <div id="collapse3"  data-parent="#accordion">
                                                <p> Да, забираем 3% на депозит и 3% на вывод</p>
                                            </div>
                                            )}
                                        </div>

                                        <div className="accordion__card">
                                            { global.lan === false ? <button className="collapsed" type="button" data-toggle="collapse" data-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                                                4.  HOW CAN I WITHDRAW MY REWARD?
                                                <span onClick={() => onClickBoard(4)}>
                                                {clipId !== 4 ? (<i className="fa fa-plus"></i>) : (<i className="fa fa-minus"></i>)} 
                                                </span>
                                            </button>
                                            : <button className="collapsed" type="button" data-toggle="collapse" data-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                                                4.   Как я могу забрать свою награду?
                                                <span onClick={() => onClickBoard(4)}>
                                                {clipId !== 4 ? (<i className="fa fa-plus"></i>) : (<i className="fa fa-minus"></i>)} 
                                                </span>
                                            </button> }
                                            { global.lan === false && clipId === 4 && (
                                            <div id="collapse4"  data-parent="#accordion">
                                                <p> At any time, you can click the GET REWARD button and your BUSD will be credited to you.</p>
                                            </div>
                                            )}
                                            { global.lan === true && clipId === 4 && (
                                            <div id="collapse4"  data-parent="#accordion">
                                                <p> Нажмите кнопку ПОЛУЧИТЬ НАГРАДУ, и ваши BUSD будут начислены.</p>
                                            </div>
                                            )}
                                        </div>
                                        <div className="accordion__card">
                                            { global.lan === false ? <button className="collapsed" type="button" data-toggle="collapse" data-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                                                5.  HOW IS Gemstone SUSTAINABLE?
                                                <span onClick={() => onClickBoard(5)}>
                                                {clipId !== 5 ? (<i className="fa fa-plus"></i>) : (<i className="fa fa-minus"></i>)} 
                                                </span>
                                            </button>
                                            : <button className="collapsed" type="button" data-toggle="collapse" data-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                                                5.  Чем обеспечен Gemstone?
                                                <span onClick={() => onClickBoard(5)}>
                                                {clipId !== 5 ? (<i className="fa fa-plus"></i>) : (<i className="fa fa-minus"></i>)} 
                                                </span>
                                            </button> }
                                            { global.lan === false && clipId === 5 && (
                                            <div id="collapse5"  data-parent="#accordion">
                                                <p> Gemstone generates profit automatically using an arbitration system.</p>
                                            </div>
                                            )}
                                            { global.lan === true && clipId === 5 && (
                                            <div id="collapse5"  data-parent="#accordion">
                                                <p> Gemstone имеет уникальный алгоритм генерации прибыли, за счёт арбитража криптовалюты.</p>
                                            </div>
                                            )}    
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default About;