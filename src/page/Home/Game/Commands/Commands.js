import React, { Component } from "react";
import { Row, Col, Button, Label, Input, Tooltip } from "reactstrap";

import classes from "./Commands.module.css";

export default class Commands extends Component {
  state = {
    soldierTooltip: false,
    specialUnitTooptip: false,
    fortifyTooltip: false,
    upgradeTooltip: false
  };

  render() {
    let buildOption = <div />;
    let upgradeOption = <div />;
    let units = <div />;
    if (
      this.props.openCell.controlledBy === this.props.me &&
      (this.props.openCell.structure === "Town" ||
        this.props.openCell.structure === "Castle")
    ) {
      buildOption = (
        <span>
          <Button
            id="soldierButton"
            className="mt-1 mr-1"
            color="info"
            onClick={() =>
              this.props.buildUnit(
                this.props.units.Soldier,
                this.props.openCell
              )
            }
          >
            Build Soldier (2)
          </Button>
          <Tooltip
            placement="top"
            isOpen={this.state.soldierTooltip}
            target="soldierButton"
            toggle={() =>
              this.setState({ soldierTooltip: !this.state.soldierTooltip })
            }
          >
            Basic military unit. Good at defense.
          </Tooltip>
          {this.props.openCell.specialUnit !== "None" ? (
            <span>
              <Button
                id="specialUnit"
                className="mt-1 mr-1"
                color="info"
                onClick={() =>
                  this.props.buildUnit(
                    this.props.units[this.props.openCell.specialUnit],
                    this.props.openCell
                  )
                }
              >
                Build {this.props.openCell.specialUnit} (
                {new this.props.units[this.props.openCell.specialUnit]().cost})
              </Button>
              <Tooltip
                placement="top"
                isOpen={this.state.specialUnitTooptip}
                target="specialUnit"
                toggle={() =>
                  this.setState({
                    specialUnitTooptip: !this.state.specialUnitTooptip
                  })
                }
              >
                {
                  new this.props.units[this.props.openCell.specialUnit]()
                    .description
                }
              </Tooltip>
            </span>
          ) : (
            ""
          )}
        </span>
      );
      if (this.props.openCell.structure === "Town") {
        upgradeOption = (
          <span>
            <Button
              id="fortifyButton"
              className="mt-1 mr-1"
              color="warning"
              onClick={() => this.props.fortifyStructure(this.props.openCell)}
            >
              Fortify (3)
            </Button>
            <Tooltip
              placement="top"
              isOpen={this.state.fortifyTooltip}
              target="fortifyButton"
              toggle={() =>
                this.setState({ fortifyTooltip: !this.state.fortifyTooltip })
              }
            >
              Increase defense bonus by 1.
            </Tooltip>
            <Button
              id="upgradeButton"
              className="mt-1 mr-1"
              color="warning"
              onClick={() => this.props.upgradeStructure(this.props.openCell)}
            >
              Upgrade to Castle (7)
            </Button>
            <Tooltip
              placement="top"
              isOpen={this.state.upgradeTooltip}
              target="upgradeButton"
              toggle={() =>
                this.setState({ upgradeTooltip: !this.state.upgradeTooltip })
              }
            >
              Upgrade from Town to Castle. (Fortifying a castle is cheaper)
            </Tooltip>
          </span>
        );
      }
      if (this.props.openCell.structure === "Castle") {
        upgradeOption = (
          <span>
            <Button
              id="fortifyButton"
              className="mt-1 mr-1"
              color="warning"
              onClick={() => this.props.fortifyStructure(this.props.openCell)}
            >
              Fortify (2)
            </Button>
            <Tooltip
              placement="top"
              isOpen={this.state.fortifyTooltip}
              target="fortifyButton"
              toggle={() =>
                this.setState({ fortifyTooltip: !this.state.fortifyTooltip })
              }
            >
              Increase defense bonus by 1.
            </Tooltip>
          </span>
        );
      }
    }
    if (
      this.props.openCell.units &&
      this.props.openCell.units[this.props.me].length > 0
    ) {
      units = (
        <div>
          <div>
            {this.props.openCell.units[this.props.me].map(unit => {
              const style = { border: "1px solid white" };
              if (
                this.props.selectedUnits.find(el => {
                  return el === unit.ID;
                })
              ) {
                style.border = "1px solid yellow";
              }
              if (unit.movesLeft <= 0) {
                style.border = "1px solid #999";
              }
              return (
                <span key={unit.ID} style={{ paddingRight: "2px" }}>
                  <Label check className="p-2" style={style}>
                    <Input
                      id={unit.ID}
                      type="checkbox"
                      name="selectUnitToMove"
                      className="invisible"
                      value={unit.ID}
                      onClick={() => {
                        if (unit.movesLeft > 0) this.props.selectUnit(unit.ID);
                      }}
                    />{" "}
                    {unit.name}
                    <br />
                    ATK: {unit.attack}
                    <br />
                    HP: {unit.health}
                    <br />
                    Moves: {unit.movesLeft}
                  </Label>
                </span>
              );
            })}
          </div>
        </div>
      );
    }
    return (
      <div className={classes.commands}>
        <Row style={{ width: "100%", height: "100%" }}>
          <Col>
            {this.props.me === this.props.currentTurn ? <div className={classes.box}>
              {units}
              <hr />
              <Button
                color="success"
                onClick={this.props.newTurn}
                style={{ float: "right" }}
              >
                Pass Turn
              </Button>
              {this.props.openCell &&
              this.props.openCell.units &&
              this.props.openCell.units[this.props.me].length > 0 ? (
                <Button className="mr-1" onClick={this.props.selectAllUnits}>
                  Select All
                </Button>
              ) : (
                ""
              )}
              {this.props.selectedUnits.length > 0 ? (
                <Button className="mr-1" onClick={this.props.moveUnits}>
                  Move Selected
                </Button>
              ) : (
                ""
              )}
              <br />
              {buildOption} <br />
              {upgradeOption}
            </div>: <div />}
          </Col>
          <Col xs="4" className={classes.box}>
            {this.props.gameLog.map((log, index) => {
              return <div key={index}>{log}</div>;
            })}
          </Col>
        </Row>
      </div>
    );
  }
}
