import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

function ParkingLot({ lot }) {
  return (
    <div>
      <Card>
        <CardImg
          src={
            lot.image_url ||
            "https://media.istockphoto.com/vectors/colored-parked-cars-on-the-parking-vector-id538322418?k=6&m=538322418&s=612x612&w=0&h=EB0vICm1m5PZpEvOO_pwLy_dn71wxRtENdRbIcH9Jnw="
          }
          alt="parking lot clipart"
        />
        <CardBody>
          <CardTitle>{lot.name}</CardTitle>
          <CardSubtitle>
            {lot.location.display_address.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </CardSubtitle>
          <CardText>
            <span>Rating: {lot.rating}</span>
            <span>Number of Reviews: {lot.review_count}</span>
            <span>
              Parking Score:{" "}
              {((lot.review_count * lot.rating) / (lot.review_count + 1)).toFixed(2)}
            </span>
            <a href={lot.url} target="_blank" rel="noopener noreferrer">
              Check out this lot!
            </a>
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
}
// score = ( number of reviews * rating ) / (number of reviews + 1)

export default ParkingLot;
