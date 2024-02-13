const RateOfChangeCalculator = ({ sequence }) => {
    const calculateRateOfChange = (sequence) => {
      let totalChange = 0;
      for (let i = 1; i < sequence.length; i++) {
        totalChange += sequence[i] - sequence[i - 1];
      }
      const averageChange = totalChange / (sequence.length - 1);
      return averageChange;
    };
  
    // Calculate rate of change
    const rateOfChange = calculateRateOfChange(sequence);
  
    return (
      <div>
        <p>Rate of Change: {rateOfChange}</p>
      </div>
    );
  };

  export default RateOfChangeCalculator;