// const db = require("../models");
// const Startup = db.startup;
// const Op = db.Sequelize.Op;
const startupService = require("../services/startup.service");
const CloudStorageService = require("../services/cloudStorage.service");

// Create and Save a new startup
exports.create = async (req, res, next) => {
  try {
    // Validate request
    if (!req.body.company_name || !req.body.email_address || !req.body.company_password) {
      res.status(400).send({    
        message: "company_name, email_address, company_password can not be empty!"
      });
      return;
    }
    // Create a startup
    // use ternary operator to handle null values 
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
    const startup = {
      company_name: req.body.company_name,
      email_address: req.body.email_address,
      company_password: req.body.company_password,
      profile_description: req.body.profile_description ? req.body.profile_description :"",
      profile_photo: req.body.profile_photo ? req.body.profile_photo :"",
      cap_table: req.body.cap_table ? req.body.cap_table :"",
      acra_documents: req.body.acra_documents ? req.body.acra_document :"",
      pitch_deck: req.body.pitch_deck ? req.body.pitch_deck :"",
      video: req.body.video ? req.body.video :"",
      zoom_datetime: req.body.zoom_datetime ? req.body.zoom_datetime :"",
      commerical_champion: req.body.commerical_champion ? req.body.commerical_champion :"",
      designsprint_datetime: req.body.designsprint_datetime ? req.body.designsprint_datetime :"",
      bank_info:req.body.bank_info ? req.body.bank_info :"",
    };
    
    // Startup.create(startup)
    //   .then(data => {
    //     res.send(data);
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     console.log(err.message)
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while creating the Startup."
    //     });
    // });


    // TK's implmentation of Service Layer
    startupService.create(startup)
    .then(function (response) {
      res.send(response)
    })
    .catch(function (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Startup."
      });
    })
  } catch (error) {
    next(error)
  };
};

// Retrieve all startups from the database.
exports.findAll = (req, res) => {
  
    // const company_name = req.query.company_name;
    // var condition = company_name ? { company_name: { [Op.like]: `%${company_name}%` } } : null;
  
    // TK's implementation of Service Layer
    startupService.findAll()
    .then(function (data) {
      if (data.length == 0) {
        res.status(404).send({
          message: "No StartUps in DB"
        }) 
      }
      else {
        res.send(data);
      }
    })
    .catch(function (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retreiving Startups."
      })
    });

    // Startup.findAll({ where: condition })
    //   .then(data => {
    //     res.send(data);
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while retrieving Startups."
    //     });
    //   });
  
};

// Find a single startup with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  // TK's implementation of service layer
  startupService.findOne(id)
  .then(function (response) {
    if (response == null) {
      res.status(500).send({
        message: "Startup with id=" + id
      })
    } else {
      res.send(response)
    }
  })
  .catch(function (err) {
    res.status(500).send({
      message: "Error retrieving Startup with id=" + id
    });
  })

    // Startup.findByPk(id)
    //   .then(data => {
    //     if (data == null){
    //       res.status(500).send({
    //         message: "Startup with id=" + id
    //       })
    //     } else {
    //     res.send(data);
    //     }
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message: "Error retrieving Startup with id=" + id
    //     });
    //   });
  
};

// Update a startup by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  // need to validate req.body in the future
  // TK's implementation of service layer
  startupService.update(req.body, id)
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Startup was updated successfully."
      });
    } else {
      res.status(500).send({
        message: `Cannot update Startup with id=${id}. Maybe Startup was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating Startup with id=" + id
    });
  });
  // Startup.update(req.body, {
  //   where: { id: id }
  // })
  //   .then(num => {
  //     if (num == 1) {
  //       res.send({
  //         message: "Startup was updated successfully."
  //       });
  //     } else {
  //       res.status(500).send({
  //         message: `Cannot update Startup with id=${id}. Maybe Startup was not found or req.body is empty!`
  //       });
  //     }
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message: "Error updating Startup with id=" + id
  //     });
  //   });
};

// Delete a startup with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    
    // TK's implementation of service layer
    startupService.delete(id)
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Startup was deleted successfully!"
        });
      } else {
        res.status(500).send({
          message: `Cannot delete Startup with id=${id}. Maybe Startup was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Startup with id=" + id
      });
    });
    // Startup.destroy({
    //   where: { id: id }
    // })
    //   .then(num => {
    //     if (num == 1) {
    //       res.send({
    //         message: "Startup was deleted successfully!"
    //       });
    //     } else {
    //       res.status(500).send({
    //         message: `Cannot delete Startup with id=${id}. Maybe Startup was not found!`
    //       });
    //     }
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message: "Could not delete Startup with id=" + id
    //     });
    //   });
  
};

// Delete all startups from the database.
exports.deleteAll = (req, res) => {
  // TK's implementation of service layer
  startupService.deleteAll()
  .then(nums => {
    res.send({ message: `${nums} Startup were deleted successfully!` });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all Startup."
    });
  });

    // Startup.destroy({
    //     where: {},
    //     truncate: false
    //   })
    //     .then(nums => {
    //       res.send({ message: `${nums} Startup were deleted successfully!` });
    //     })
    //     .catch(err => {
    //       res.status(500).send({
    //         message:
    //           err.message || "Some error occurred while removing all Startup."
    //       });
    //     });
};

/////////////
//custom functions ////
// Retrieve startup via name from the database.
exports.findViaName = (req, res) => {
  // const company_name = req.query.company_name;
  const company_name = req.params.company_name;
  // console.log(req.query)
  // var condition = company_name ? { company_name: { [Op.like]: `${company_name}` } } : null;

  // TK's implementation of service layer
  startupService.findViaName(company_name)
  .then(data => {
    if (data.length == 0) {
      res.status(404).send({
        message: `No Startup with specifed company name: ${company_name}`
      }) 
    }
    else {
      res.send(data);
    }
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Startups."
    });
  });

  // Startup.findAll({ where: condition })
  //   .then(data => {
  //     res.send(data);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while retrieving Startups."
  //     });
  //   });

};

exports.findViaEmail= (req, res) => {
  const email_address = req.params.email;
  // const email = req.query.email;
  // var condition = email_address ? { email_address: { [Op.like]: `${email_address}` } } : null;
  
  // TK's implementation
  startupService.findViaEmail(email_address)
  .then(data => {
    if (data.length == 0) {
      res.status(404).send({
        message: `No Startup with specifed email address: ${email_address}`
      }) 
    }
    else {
      res.send(data);
    }
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Startup."
    });
  });

  // Startup.findAll({ where: condition })
  //   .then(data => {
  //     res.send(data);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while retrieving Startup."
  //     });
  //   });
  };

exports.uploadVideo = (req, res, next) => {
  // middleware to upload video
  // get back live link and add to req body for next middleware to access
  const video = req.body.video;
  const data = CloudStorageService.uploadVideo(video);
  req.body = {
    "video": data.link
  }
  next();
};

exports.uploadPitchDeck = (req, res, next) => {
  const pitchDeck = req.body.pitchDeck;
  const data = CloudStorageService.uploadPitchDeck(pitchDeck);
  req.body = {
    "pitch_deck": data.link
  }
  next();
}


