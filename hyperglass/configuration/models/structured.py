"""Structured data configuration variables."""

# Standard Library
from typing import List

# Third Party
from pydantic import StrictInt, StrictStr, constr

# Project
from hyperglass.models import HyperglassModel


class StructuredCommunities(HyperglassModel):
    """Control structured data response for BGP communties."""

    mode: constr(regex=r"(permit|deny)") = "deny"
    items: List[StrictStr] = []


class StructuredRpki(HyperglassModel):
    """Control structured data response for RPKI state."""

    mode: constr(regex=r"(router|external)") = "router"
    max_age: StrictInt = 24


class Structured(HyperglassModel):
    """Control structured data responses."""

    communities: StructuredCommunities = StructuredCommunities()
    rpki: StructuredRpki = StructuredRpki()
