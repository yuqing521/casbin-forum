// Copyright 2020 The casbin Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React from "react";
import * as Setting from "../Setting";
import i18next from "i18next";
import * as BalanceBackend from "../backend/BalanceBackend";
import PageColumn from "./PageColumn";
import {withRouter} from "react-router-dom";

const pangu = require("pangu");

class BalanceBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      records: [],
      p: "",
      page: 1,
      limit: 25,
      minPage: 1,
      maxPage: -1,
      recordsNum: 0,
      topicThanksCost: 15.0,
      replyThanksCost: 10.0,
      url: ""
    };
    const params = new URLSearchParams(this.props.location.search)
    this.state.p = params.get("p")
    if (this.state.p === null) {
      this.state.page = 1
    }else {
      this.state.page = parseInt(this.state.p)
    }
  
    this.state.url = `/balance`
  }

  componentDidMount() {
    this.getRecords();
  }

  getRecords() {
    BalanceBackend.getConsumptionRecord(this.state.limit, this.state.page)
      .then((res) => {
        this.setState({
          records: res?.data,
          recordNum: res?.data2
        });
      });
  }

  showPageColumn() {
    if (this.state.recordsNum === 0) {
      return
    }
    return (
      <PageColumn page={this.state.page} total={this.state.recordsNum} url={this.state.url}/>
    )
  }

  renderRecord(record) {
    switch (record?.consumptionType) {
      case 1:
        return (
          <tr>
            <td className="d">
              <small className="gray">{Setting.getFormattedDate(record?.createdTime)}</small>
            </td>
            <td className="d">{i18next.t("balance:Checkin bonus")}</td>
            <td className="d" style={{textAlign: "right"}}>
              <span className="positive">
                <strong>{record?.amount + ".0"}</strong>
              </span>
            </td>
            <td className="d" style={{textAlign: "right"}}>{record?.balance + ".0"}</td>
            <td className="d" style={{borderRight: "none"}}>
              <span className="gray">{record?.createdTime.replace(/-/g, '').substring(0, 8)}{" "}{i18next.t("balance:'s daily checkin bonus")}{" "}{record?.amount} 铜币</span>
            </td>
          </tr>
        )
      case 2:
        return (
          <tr>
            <td className="d">
              <small className="gray">{Setting.getFormattedDate(record?.createdTime)}</small>
            </td>
            <td className="d">{i18next.t("balance:Received thanks")}</td>
            <td className="d" style={{textAlign: "right"}}>
              <span className="positive">
                <strong>{record?.amount + ".0"}</strong>
              </span>
            </td>
            <td className="d" style={{textAlign: "right"}}>{record?.balance + ".0"}</td>
            <td className="d" style={{borderRight: "none"}}>
              <span className="gray">
                <a href={`/member/${record?.consumerId}`}>{record?.consumerId}</a>{" "}{i18next.t("balance:Thanks your topic")}{" "}›{" "}<a href={`/t/${record?.objectId}`}>{pangu.spacing(record?.title)}</a>
              </span>
            </td>
          </tr>
        )
      case 3:
        return (
          <tr>
            <td className="d">
              <small className="gray">{Setting.getFormattedDate(record?.createdTime)}</small>
            </td>
            <td className="d">{i18next.t("balance:Received thanks")}</td>
            <td className="d" style={{textAlign: "right"}}>
              <span className="positive">
                <strong>{record?.amount + ".0"}</strong>
              </span>
            </td>
            <td className="d" style={{textAlign: "right"}}>{record?.balance + ".0"}</td>
            <td className="d" style={{borderRight: "none"}}>
              <span className="gray">
                <a href={`/member/${record?.consumerId}`}>{record?.consumerId}</a>{" "}{i18next.t("balance:Thanks your reply in")}{" "}<a href={`/t/${record?.objectId}`}>{pangu.spacing(record?.title)}</a>{" "}{i18next.t("balance:的回复")}
              </span>
            </td>
          </tr>
        )
      case 4:
        return (
          <tr>
            <td className="d">
              <small className="gray">{Setting.getFormattedDate(record?.createdTime)}</small>
            </td>
            <td className="d">{i18next.t("balance:Send thanks")}</td>
            <td className="d" style={{textAlign: "right"}}>
              <span className="negative">
                <strong>{record?.amount + ".0"}</strong>
              </span>
            </td>
            <td className="d" style={{textAlign: "right"}}>{record?.balance + ".0"}</td>
            <td className="d" style={{borderRight: "none"}}>
              <span className="gray">{i18next.t("balance:Thanks")}{" "}<a href={`/member/${record?.consumerId}`}>{record?.consumerId}</a>{" "}{i18next.t("balance:'s topic")}{" "}›{" "}<a href={`/t/${record?.objectId}`}>{pangu.spacing(record?.title)}</a></span></td>
          </tr>
        )
      case 5:
        return (
          <tr>
            <td className="d">
              <small className="gray">{Setting.getFormattedDate(record?.createdTime)}</small>
            </td>
            <td className="d">{i18next.t("balance:Send thanks")}</td>
            <td className="d" style={{textAlign: "right"}}>
              <span className="negative">
                <strong>{record?.amount + ".0"}</strong>
              </span>
            </td>
            <td className="d" style={{textAlign: "right"}}>{record?.balance + ".0"}</td>
            <td className="d" style={{borderRight: "none"}}>
              <span className="gray">{i18next.t("balance:Thanks")}{" "}<a href={`/member/${record?.consumerId}`}>{record?.consumerId}</a>{" "}{i18next.t("balance:'s reply")}{" "}›{" "}<a href={`t/${record?.objectId}`}>{pangu.spacing(record?.title)}</a></span></td>
          </tr>
        )
      case 6:
        return (
          <tr>
            <td className="d">
              <small className="gray">{Setting.getFormattedDate(record?.createdTime)}</small>
            </td>
            <td className="d">{i18next.t("balance:Create reply")}</td>
            <td className="d" style={{textAlign: "right"}}>
              <span className="negative">
                <strong>{record?.amount + ".0"}</strong>
              </span>
            </td>
            <td className="d" style={{textAlign: "right"}}>{record?.balance + ".0"}</td>
            <td className="d" style={{borderRight: "none"}}><span className="gray">{i18next.t("balance:Created a")}{" "}{record?.length}{" "}{i18next.t("balance:characters reply")}{" "}›{" "}<a href={`t/${record?.objectId}`}>{pangu.spacing(record?.title)}</a></span>
            </td>
          </tr>
        )
      case 7:
        return (
          <tr>
            <td className="d">
              <small className="gray">{Setting.getFormattedDate(record?.createdTime)}</small>
            </td>
            <td className="d">{i18next.t("balance:Topic response bonus")}</td>
            <td className="d" style={{textAlign: "right"}}>
              <span className="positive">
                <strong>{record?.amount + ".0"}</strong>
              </span>
            </td>
            <td className="d" style={{textAlign: "right"}}>{record?.balance + ".0"}</td>
            <td className="d" style={{borderRight: "none"}}>
              <span className="gray">{i18next.t("balance:receive")}{" "}<a href={`/member/${record?.consumerId}`}>{record?.consumerId}</a>{" "}{i18next.t("balance:'s reply")}{" "}›{" "}<a href={`t/${record?.objectId}`}>{pangu.spacing(record?.title)}</a></span></td>
          </tr>
        )
      case 8:
        return (
          <tr>
            <td className="d">
              <small className="gray">{Setting.getFormattedDate(record?.createdTime)}</small>
            </td>
            <td className="d">{i18next.t("balance:Create topic")}</td>
            <td className="d" style={{textAlign: "right"}}>
              <span className="negative">
                <strong>{record?.amount + ".0"}</strong>
              </span>
            </td>
            <td className="d" style={{textAlign: "right"}}>{record?.balance + ".0"}</td>
            <td className="d" style={{borderRight: "none"}}><span className="gray">{i18next.t("balance:Created a")}{" "}{record?.length}{" "}{i18next.t("balance:characters topic")}{" "}›{" "}<a href={`t/${record?.objectId}`}>{pangu.spacing(record?.title)}</a></span>
            </td>
          </tr>
        )
      case 9:
        return (
          <tr>
            <td className="d">
              <small className="gray">{Setting.getFormattedDate(record?.createdTime)}</small>
            </td>
            <td className="d">{i18next.t("balance:Top topic")}</td>
            <td className="d" style={{textAlign: "right"}}>
              <span className="negative">
                <strong>{record?.amount + ".0"}</strong>
              </span>
            </td>
            <td className="d" style={{textAlign: "right"}}>{record?.balance + ".0"}</td>
            <td className="d" style={{borderRight: "none"}}><span className="gray">{i18next.t("balance:Topped topic")}{" "}<a href={`t/${record?.objectId}`}>{pangu.spacing(record?.title)}</a>{" "}{i18next.t("balance:进行置顶操作")}</span>
            </td>
          </tr>
        )
    }
  }

  render() {
    return (
      <div className="box">
        <div className="cell">
          <div className="fr" style={{margin: "-3px -8px 0px 0px"}}><a href="/top/rich" className="tab">{i18next.t("balance:Wealth ranking")}</a><a
            href="/top/player" className="tab">{i18next.t("balance:Consumption ranking")}</a><a href="/balance/add/alipay" className="tab">{i18next.t("balance:Recharge")}</a></div>
          <a href="/">{Setting.getForumName()}</a> <span className="chevron">&nbsp;›&nbsp;</span>{" "}{i18next.t("balance:Account balance")}
        </div>
        <div className="cell">
          <table cellPadding="10" cellSpacing="0" border="0" width="100%">
            <tr>
              <td width="200">
                <span className="gray">{i18next.t("balance:Current account balance")}</span>
                <div className="sep10"></div>
                <div className="sep5"></div>
                <div className="balance_area bigger" style={{fontSize: "24px", lineHeight: "24px"}}>
                  {
                    this.props.account?.goldCount !== 0 ?
                      <span>
                        {" "}{this.props.account?.goldCount}{" "}
                        <img src={Setting.getStatic("/static/img/gold@2x.png")} height="16" alt="G" border="0"/>
                      </span>
                    : null
                  }
                  {" "}{this.props.account?.silverCount}{" "}
                  <img src={Setting.getStatic("/static/img/silver@2x.png")} height="16" alt="S" border="0"/>
                  {" "}{this.props.account?.bronzeCount}{" "}
                  <img src={Setting.getStatic("/static/img/bronze@2x.png")} height="16" alt="B" border="0"/>
                </div>
                <div className="sep10"></div>
                <div className="sep5"></div>
                <li className="fa fa-question-circle gray"></li>
                <a href="/help/currency">{i18next.t("balance:Documentation on the virtual currency system")}</a></td>
            </tr>
          </table>
        </div>
        <div>
          <table cellpadding="5" cellspacing="0" border="0" width="100%" class="data">
            <tbody>
            <tr>
              <td width="130" className="h">{i18next.t("balance:Time")}</td>
              <td width="100" className="h">{i18next.t("balance:Type")}</td>
              <td width="60" className="h">{i18next.t("balance:Amount")}</td>
              <td width="60" className="h">{i18next.t("balance:Balance")}</td>
              <td width="auto" className="h" style={{borderRight: "none"}}>{i18next.t("balance:Description")}</td>
            </tr>
            {this.showPageColumn()}
            {
              this.state.records.map((record) => {
                return this.renderRecord(record);
              })
            }
            {this.showPageColumn()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default withRouter(BalanceBox);
