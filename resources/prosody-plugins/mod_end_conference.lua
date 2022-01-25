local endconference_component = module:get_option_string('end_conference_component', 'endconference.'..module.host);

-- Advertise end conference so client can pick up the address and use it
module:add_identity('component', 'end_conference', endconference_component);

module:depends("jitsi_session");
