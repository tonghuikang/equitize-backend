
const milestoneService = require("../services/milestone.service");

// Create and Save a new startup
exports.create = (req, res) => {
  try {
    // Validate request
    if (!req.body.companyId || !req.body.milestonePart || !req.body.endDate || !req.body.amount ) {
      res.status(400).send({    
        message: "companyId, milestonePart, endDate, amount can not be empty!"
      });
      return;
    }
    
    // Create a milestone
    // use ternary operator to handle null values 
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
    const milestone = {
      companyId: req.body.companyId,
      title: req.body.title,
      milestonePart: req.body.milestonePart,
      endDate: req.body.endDate,
      description: req.body.description ? req.body.description :"",
      amount: req.body.amount,
    };
    console.log(milestoneService)    
    // TK's implementation of service layer 
    milestoneService.create(milestone)
    .then(data => {
      
      res.send(data);
    })
    .catch(err => {
      
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Milestone."
      });
    });
    // Milestone.create(milestone)
    //   .then(data => {
    //     res.send(data);
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while creating the Milestone."
    //     });
    //   });
  } catch (error) {
    console.log(error)
    next(error)
  }
  
};

// Retrieve all Milestone from the database.
exports.findAll = (req, res) => {
    const companyId = req.query.companyId;
    // var condition = company_id ? { company_id: { [Op.like]: `%${company_id}%` } } : null;
    
    // Tk's implementation of service layer
    milestoneService.findAll(companyId)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Milestone."
      });
    });
    // Milestone.findAll({ where: condition })
    //   .then(data => {
    //     res.send(data);
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while retrieving Milestone."
    //     });
    //   });
  
};

// Find a single startup with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    // Tk's implementation of service layer
    milestoneService.findByPk(id)
    .then(data => {
      if (data == null){
        res.status(500).send({
          message: "Milestone with id=" + id
        })
      } else {
      res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Milestone with id=" + id
      });
    });

    // Milestone.findByPk(id)
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
    //       message: "Error retrieving Milestone with id=" + id
    //     });
    //   });
  
};

// Update a Milestone by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  // Tk's implementation of service layer 
  milestoneService.update(req.bod, id)
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Milestone was updated successfully."
      });
    } else {
      res.status(500).send({
        message: `Cannot update Milestone with id=${id}. Maybe Milestone was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating Milestone with id=" + id
    });
  });

  // Milestone.update(req.body, {
  //   where: { id: id }
  // })
  //   .then(num => {
  //     if (num == 1) {
  //       res.send({
  //         message: "Milestone was updated successfully."
  //       });
  //     } else {
  //       res.status(500).send({
  //         message: `Cannot update Milestone with id=${id}. Maybe Milestone was not found or req.body is empty!`
  //       });
  //     }
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message: "Error updating Milestone with id=" + id
  //     });
  //   });
};

// Delete a Milestone with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    // Tk's implmentation of service layer
    milestoneService.delete(id)
    .then(num => {
      if (num == 1) {
        res.send({
          message: "CommerciaMilestonelChampion was deleted successfully!"
        });
      } else {
        res.status(500).send({
          message: `Cannot delete Milestone with id=${id}. Maybe Milestone was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Milestone with id=" + id
      });
    });

    // Milestone.destroy({
    //   where: { id: id }
    // })
    //   .then(num => {
    //     if (num == 1) {
    //       res.send({
    //         message: "CommerciaMilestonelChampion was deleted successfully!"
    //       });
    //     } else {
    //       res.status(500).send({
    //         message: `Cannot delete Milestone with id=${id}. Maybe Milestone was not found!`
    //       });
    //     }
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message: "Could not delete Milestone with id=" + id
    //     });
    //   });
};

// Delete all Milestone from the database.
exports.deleteAll = (req, res) => {
  // Tk's implementation of service layer
  milestone.deleteAll()
  .then(nums => {
    res.send({ message: `${nums} Milestone were deleted successfully!` });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all CommercialChampion."
    });
  });
  // Milestone.destroy({
  //       where: {},
  //       truncate: false
  //     })
  //       .then(nums => {
  //         res.send({ message: `${nums} Milestone were deleted successfully!` });
  //       })
  //       .catch(err => {
  //         res.status(500).send({
  //           message:
  //             err.message || "Some error occurred while removing all CommercialChampion."
  //         });
  //       });
};

/////////////
//custom functions ////
// Retrieve Milestone via name from the database.
exports.findViaName = (req, res) => {
  // const company_name = req.query.company_name;
  const name = req.params.companyName;
  // console.log(req.query)
  // var condition = name ? { name: { [Op.like]: `${name}` } } : null;

  // Tk's implmentation of service layer
  milestoneService.findViaName(name)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Milestone."
    });
  });
  // Milestone.findAll({ where: condition })
  //   .then(data => {
  //     res.send(data);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while retrieving Milestone."
  //     });
  //   });

};

// Retrieve Milestone via company_id from the database
exports.findViaCompanyId = (req, res) => {
  const companyId = req.params.companyId;
  // console.log(req.query)
  // var condition = company_id ? { company_id: { [Op.like]: `${company_id}` } } : null;
  // Tk's implementation of service layer
  
  milestoneService.findViaCompanyId(companyId)
  .then(data => {
    if (data.length == 0) {
      res.status(404).send({
        message: `No Milestone with specifed company id: ${companyId}`
      }) 
    }
    else {
      res.send(data);
    }
  })
  .catch(err => {
    
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Milestone."
    });
  });
  // Milestone.findAll({ where: condition })
  //   .then(data => {
  //     res.send(data);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while retrieving Milestone."
  //     });
  //   });

};



